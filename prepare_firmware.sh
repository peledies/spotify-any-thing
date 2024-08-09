#!/usr/bin/env bash

red=$(tput setaf 1)
gold=$(tput setaf 3)
blue=$(tput setaf 4)
magenta=$(tput setaf 5)
cyan=$(tput setaf 6)
default=$(tput sgr0)

info_box() {
  NUM=$((${#1} + 4))
  echo "${cyan}"
  eval printf %.0s# '{1..'"${NUM}"\}; echo
  echo "# $1 #"
  eval printf %.0s# '{1..'"${NUM}"\}; echo
  echo "${default}"
}

FIRMWARES=(
  "8.1.6_adb_enabled.tar.xz"
  "8.2.5_adb_enabled.tar.xz"
  "8.2.5_nonpremium.tar.xz"
  "8.2.5_stock.tar.xz"
  "factory_fresh.tar.xz"
)

PS3="${cyan}Select a firmware to download and prepare (q to quit): $gold"
select firmware in "${FIRMWARES[@]}"; do
  case "$firmware" in
    "") break ;;  # This is a fake; any invalid entry makes $firmware=="", not just "q".
    *) break ;;
  esac
done

if [ -z "$firmware" ]; then
  echo "${red}No firmware selected. Exiting.${default}"
  exit 1
fi

firmware_dir=${firmware%.tar.xz}

info_box "Downloading firmware"
echo "  Downloading [${magenta}${firmware}${default}] firmware to [${magenta}${PWD}/firmware/${firmware}.tar.xz${default}]"
curl --create-dirs -O --output-dir ./firmware https://car-thing.s3.us-east-2.amazonaws.com/$firmware

info_box "Creating firmware directory"
echo "  Creating firmware directory [${magenta}${PWD}/firmware/${firmware}${default}]"
mkdir -p ./firmware/$firmware_dir

info_box "Extracting firmware"
echo "  Extracting [${magenta}${firmware}${default}] firmware to [${magenta}${PWD}/firmware/${firmware}${default}]"
tar -xf firmware/$firmware -C ./firmware/$firmware_dir

info_box "Updating firmware extensions"
echo "  Updating extensions in [${magenta}${PWD}/firmware/${firmware}${default}]"
if [ -f ./firmware/$firmware_dir/data.dump ]; then mv ./firmware/$firmware_dir/data.dump ./firmware/$firmware_dir/data.ext4; fi
if [ -f ./firmware/$firmware_dir/settings.dump ]; then mv ./firmware/$firmware_dir/settings.dump ./firmware/$firmware_dir/settings.ext4; fi
if [ -f ./firmware/$firmware_dir/system_a.dump ]; then mv ./firmware/$firmware_dir/system_a.dump ./firmware/$firmware_dir/system_a.ext2; fi
if [ -f ./firmware/$firmware_dir/system_b.dump ]; then mv ./firmware/$firmware_dir/system_b.dump ./firmware/$firmware_dir/system_b.ext2; fi
