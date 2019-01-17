rm dist/hackerthemes-theme-kit.zip -f
mkdir dist -p
gulp
pushd ..
find theme-kit \( -path '*/.*' -o -path 'theme-kit/node_modules*' -o -path 'dist*' \) -prune -o -type f -print | zip theme-kit/dist/hackerthemes-theme-kit.zip -@
popd
