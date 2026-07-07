# Secure Directory

All files in this directory are **age-encrypted** (X25519). They are stored as encrypted blobs in git and are only readable when decrypted locally using the key from the repository root.

## Decryption

```bash
age -d -i ../age.key <filename.age> > <filename.ext>
```

## Encrypted Files

| Encrypted File | Original | Size |
|---|---|---|
| `CED_CIUDADANIA.txt.age` | `profile/CED_CIUDADANIA.pdf` | 910,341 bytes |
| `Profile photo.jpg.age` | `profile/Profile photo.jpg` | - |
| `Profile photo.heic.age` | `profile/Profile photo.heic` | - |
| `Profile photo blank.jpg.age` | `profile/Profile photo blank.jpg` | - |
| `Acta de grado.pdf.age` | `profile/Acta de grado.pdf` | - |
| `Certificado afiliacion sura.pdf.age` | `profile/Certificado afiliacion sura.pdf` | - |
| `Luis_Gerardo_Manrique_Cardona.pdf.age` | `profile/Luis_Gerardo_Manrique_Cardona.pdf` | - |
| `Luis_Gerardo_Manrique_Cardona_-_-2.pdf.age` | `profile/Luis_Gerardo_Manrique_Cardona_-_-2.pdf` | - |
| `cedulaGerardo.png.age` | `parents/cedulaGerardo.png` | - |
| `cedulaRuth.png.age` | `parents/cedulaRuth.png` | - |

## Key Management

- The repository contains only the age-encrypted files in this directory.
- The decryption key (`age.key`) is not committed to git (listed in `.gitignore`).
- The key must be manually placed on any machine that needs to decrypt the files.
- Keep a backup of the key in a secure location (password manager, encrypted USB, etc.).
