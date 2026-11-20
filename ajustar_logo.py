from PIL import Image

# Abrir el logo original
logo = Image.open("assets/images/logo 2.png").convert("RGBA")

# Crear imagen cuadrada transparente
nuevo = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))

# Ajustar tamaño sin deformar
logo.thumbnail((1024, 1024), Image.Resampling.LANCZOS)

# Centrar el logo
x = (1024 - logo.width) // 2
y = (1024 - logo.height) // 2

nuevo.alpha_composite(logo, (x, y))

# Guardar nuevo logo
nuevo.save("assets/images/logo-cafu-cuadrado.png")

print("Logo cuadrado creado correctamente.")
print("Dimensiones:", nuevo.size)