#!bin/bash
for file in `\find ./_images -maxdepth 1 -type f`; do
    str=`basename $file`
    if [ ! -e './images/'$str ]; then
      convert -resize 128x72 $file './images/'$str
      printf '\e[32mcreated ./images/'$str'.\e[m\n'
    else
      printf './images/'$str' is already exists.\n'
    fi
done