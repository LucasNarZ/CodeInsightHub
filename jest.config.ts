import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootDir>"],
  maxWorkers:1,
  verbose: true,
  forceExit: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
 }

export default jestConfig;
