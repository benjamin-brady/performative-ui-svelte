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

const toSummary = (item: RegistryItem) =>
  withoutEmpty({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    devDependencies: item.devDependencies,
    registryDependencies: item.registryDependencies,
    categories: item.categories,
    files: item.files,
    url: `${REGISTRY_BASE_URL}/${item.name}.json`,
  });

const buildItem = async (item: RegistryItem): Promise<BuiltRegistryItem> => {
  const files = await Promise.all(
    item.files.map(async (file) => ({
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
    registryDependencies: item.registryDependencies,
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
