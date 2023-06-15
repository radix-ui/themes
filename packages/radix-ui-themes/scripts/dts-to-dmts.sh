find ./dist/esm -name '*.d.ts' -exec sh -c 'mv "$0" "${0%.d.ts}.d.mts"' {} \;
