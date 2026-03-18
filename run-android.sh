#!/bin/bash

# Path to the emulator
EMULATOR="/opt/homebrew/share/android-commandlinetools/emulator/emulator"

# Default AVD is the TV version
AVD_NAME="AndroidTV8_x86"

# If an argument is provided, use that as the AVD name (e.g. ./run-android.sh Android8_Arm64)
if [ ! -z "$1" ]; then
    AVD_NAME="$1"
fi

if [ ! -f "$EMULATOR" ]; then
    echo "Emulator not found at $EMULATOR"
    exit 1
fi

echo "Starting Android Emulator ($AVD_NAME)..."
echo "Note: x86 emulators (like Android TV 8) run slowly on Apple Silicon."

# Launch with -writable-system and -no-snapshot-load if needed, but keeping it simple for now
$EMULATOR -avd $AVD_NAME -netdelay none -netspeed full
