# 📦 package-info
A GitHub Action extracting various fields from package.json and exporting them as environment variables

## 📖 Docs (kind of)
### Extracted fields
- author as `PACKAGE_AUTHOR`
- description as `PACKAGE_DESCRIPTION`
- license as `PACKAGE_LICENSE`
- name as `PACKAGE_NAME`
- version as `PACKAGE_VERSION`

### Usage

```yaml
- uses: nyaayaya/package-info@v1
  with:
    path: 'uwu/package.json' # Optional
    follow-symlinks: 'false' # Optional
```

And then you can use them, eg. `${{ env.PACKAGE_AUTHOR }}` 🎉

Thank you for reading this 🙇🏼‍♀️

