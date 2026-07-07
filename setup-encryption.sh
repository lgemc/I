#!/bin/bash
set -euo pipefail

cd ~/Do/I

# Step 1: Set up .gitattributes for the secure directory
cat > .gitattributes << 'ATTRS'
.secure/** filter=git-encryption
ATTRS

# Also set up .gitignore for the raw key
cat > .gitignore << 'GITIGNORE'
age.key
*.age
*.heic
GITIGNORE

# We'll put sensitive files in .secure and ignore the originals
# Create a mapping of originals to their encrypted destinations

# Create a filter-branch script
cat > /tmp/purge-origins.sh << 'SCRIPT'
#!/bin/bash
set -euo pipefail
cd ~/Do/I

# List of sensitive file paths (as they appear in the repo)
SENSITIVE_PATHS=(
  "profile/CED_CIUDADANIA.pdf"
  "profile/Profile photo.jpg"
  "profile/Profile photo.heic"
  "profile/Profile photo blank.jpg"
  "profile/Acta de grado.pdf"
  "profile/Certificado afiliacion sura.pdf"
  "profile/Luis_Gerardo_Manrique_Cardona.pdf"
  "profile/Luis_Gerardo_Manrique_Cardona_-_-2.pdf"
  "parents/cedulaGerardo.png"
  "parents/cedulaRuth.png"
)

# Encrypted file paths (in .secure/)
ENCRYPTED_PATHS=(
  ".secure/CED_CIUDADANIA.pdf.age"
  ".secure/Profile_photo.jpg.age"
  ".secure/Profile_photo.heic.age"
  ".secure/Profile_photo_blank.jpg.age"
  ".secure/Acta_de_grado.pdf.age"
  ".secure/Certificado_afiliacion_sura.pdf.age"
  ".secure/Luis_Gerardo_Manrique_Cardona.pdf.age"
  ".secure/Luis_Gerardo_Manrique_Cardona_-_-2.pdf.age"
  ".secure/cedulaGerardo.png.age"
  ".secure/cedulaRuth.png.age"
)

# Create a filter script that removes originals and adds encrypted replacements
for i in "${!SENSITIVE_PATHS[@]}"; do
  orig="${SENSITIVE_PATHS[$i]}"
  enc="${ENCRYPTED_PATHS[$i]}"
  
  # Create a blob hash of the encrypted file
  enc_hash=$(git hash-object "$enc")
  
  # Build a tree that removes the original and adds the encrypted version
  # We'll use BFG if available, otherwise git-filter-branch
  echo "Processing: $orig → $enc"
done

echo "Done building filter list"
SCRIPT

chmod +x /tmp/purge-origins.sh

echo "Setup complete. Ready for history rewrite."