#!/usr/bin/env bun
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  REGISTRY_ALIASES,
  REGISTRY_BASE_URL,
  REGISTRY_HOMEPAGE,
  REGISTRY_ITEM_SCHEMA,
  REGISTRY_NAME,
  REGISTRY_SCHEMA,
  registryItems,
  type RegistryFile,
  type RegistryItem,
} from "../src/lib/registry/registry-map";

const root = resolve(import.meta.dir, "..");
const outputDir = resolve(root, "static/registry");

// Allow overriding the published base URL (e.g. to build a registry that points
// at a local server for end-to-end testing of the install flow).
const baseUrl = (process.env.REGISTRY_BASE_URL ?? REGISTRY_BASE_URL).replace(
  /\/$/,
  "",
);

interface BuiltRegistryFile extends RegistryFile {
  content: string;
}

interface BuiltRegistryItem extends Omit<RegistryItem, "files"> {
  $schema: string;
  files: BuiltRegistryFile[];
}

const withoutEmpty = <T extends Record<string, unknown>>(value: T): T => {
  for (const key of Object.keys(value)) {
    const current = value[key];
    if (Array.isArray(current) && current.length === 0) {
      delete value[key];
    }
    if (current === undefined) {
      delete value[key];
    }
  }
  return value;
};

const isAbsoluteUrl = (value: string) => /^[a-z][a-z0-9+.-]*:\/\//i.test(value);

// shadcn-svelte resolves bare registryDependencies names against the default
// registry origin, which fails for components installed from this registry's
// item URLs. Emit fully-qualified URLs so dependency resolution works when a
// component is added directly by URL.
const resolveRegistryDeps = (
  deps: string[] | undefined,
): string[] | undefined =>
  deps?.map((dep) =>
    isAbsoluteUrl(dep) ? dep : `${baseUrl}/${dep}.json`,
  );

// shadcn-svelte's file-target resolver only alias-resolves a leading "~/"
// (project root). A "$lib/..." target is instead joined onto the type's base
// directory, producing a literal "$lib" folder (e.g.
// src/lib/components/ui/$lib/components/Button.svelte) and bypassing the intended
// layout. Rewrite "$lib/" code-file targets to project-root ("~/src/lib/")
// targets so installs land exactly where component imports expect them. CSS
// (registry:style/theme) is merged into the app stylesheet and keeps its target.
const STYLE_TYPES = new Set(["registry:style", "registry:theme"]);

const resolveFileTarget = (file: RegistryFile): string | undefined => {
  const target = file.target;
  if (!target || file.type === undefined) return target;
  if (STYLE_TYPES.has(file.type)) return target;
  if (target.startsWith("$lib/")) {
    return `~/src/lib/${target.slice("$lib/".length)}`;
  }
  return target;
};

const normalizeFiles = <T extends RegistryFile>(files: T[]): T[] =>
  files.map((file) => ({ ...file, target: resolveFileTarget(file) }));

const toSummary = (item: RegistryItem) =>
  withoutEmpty({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    devDependencies: item.devDependencies,
    registryDependencies: resolveRegistryDeps(item.registryDependencies),
    categories: item.categories,
    files: normalizeFiles(item.files),
    url: `${baseUrl}/${item.name}.json`,
  });

const buildItem = async (item: RegistryItem): Promise<BuiltRegistryItem> => {
  const files = await Promise.all(
    normalizeFiles(item.files).map(async (file) => ({
      ...file,
      content: await Bun.file(resolve(root, file.path)).text(),
    })),
  );

  return withoutEmpty({
    $schema: REGISTRY_ITEM_SCHEMA,
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    devDependencies: item.devDependencies,
    registryDependencies: resolveRegistryDeps(item.registryDependencies),
    categories: item.categories,
    files,
  });
};

const writeJson = async (path: string, value: unknown) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
};

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const summaries = registryItems.map(toSummary);
const registry = {
  $schema: REGISTRY_SCHEMA,
  name: REGISTRY_NAME,
  homepage: REGISTRY_HOMEPAGE,
  aliases: REGISTRY_ALIASES,
  items: summaries,
};

await writeJson(resolve(root, "registry.json"), registry);
await writeJson(resolve(outputDir, "index.json"), registry);

await Promise.all(
  registryItems.map(async (item) => {
    await writeJson(
      resolve(outputDir, `${item.name}.json`),
      await buildItem(item),
    );
  }),
);

console.log(`Built ${registryItems.length} registry items in ${outputDir}`);
