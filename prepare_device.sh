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
  "8.1.6_adb_enabled"
  "8.2.5_adb_enabled"
  "8.2.5_nonpremium"
  "8.2.5_stock"
  "factory_fresh"
)

PS3="${cyan}Select a firmware to flash to the device (q to quit): $gold"
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

info_box "Searching for Device"
DETECT=$(python3 ./superbird-tool/superbird_tool.py --find_device | tail -n 1)
if [ "$DETECT" == "Found device booted in USB Mode (buttons 1 & 4 held at boot)" ]; then
  echo "${cyan}CarThing Found and ready to go.${default}"
else
  echo "${red}CarThing NOT FOUND. Did you hold buttons 1 & 4 when you plugged it in?${default}"
  exit 1
fi

cd superbird-tool
info_box "Flashing firmware [${magenta}$firmware${cyan}]"
python3 ./superbird_tool.py --restore_device ../firmware/$firmware
