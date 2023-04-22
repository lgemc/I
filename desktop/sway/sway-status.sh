battery_percentage=$(acpi -b | awk '/Battery 0/ {print $4}' | tr -d ',')
date=$(date +'%Y-%m-%d %I:%M:%S %p')
memory_percentage=$(free | grep Mem | awk '{print $3/$2 * 100.0}' | cut -d "." -f 1)

echo '🔋'$battery_percentage '|' '📅 '$date
