import os
from PIL import Image, ImageDraw

def create_rounded_icon_from_download(size, is_maskable=False):
    # Load user's download.png
    src = Image.open("img/download.png").convert("RGBA")
    
    # Target canvas
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    
    # Scale download.png nicely into canvas
    scale = (size * 0.95) / max(src.width, src.height)
    new_w = int(src.width * scale)
    new_h = int(src.height * scale)
    src_resized = src.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Paste centered
    paste_x = (size - new_w) // 2
    paste_y = (size - new_h) // 2
    canvas.paste(src_resized, (paste_x, paste_y), src_resized)
    
    if not is_maskable:
        # Apply smooth rounded corners (squircle / 22% radius)
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        radius = int(size * 0.22)
        draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=255)
        
        output = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        output.paste(canvas, (0, 0), mask)
        return output
    else:
        return canvas

os.makedirs("icons", exist_ok=True)

# Generate 512x512
icon512 = create_rounded_icon_from_download(512, is_maskable=False)
icon512.save("icons/icon-512.png", "PNG")

# Generate 192x192
icon192 = create_rounded_icon_from_download(192, is_maskable=False)
icon192.save("icons/icon-192.png", "PNG")

# Generate 180x180 for iOS Apple Touch Icon
icon180 = create_rounded_icon_from_download(180, is_maskable=False)
icon180.save("icons/apple-touch-icon.png", "PNG")

# Generate 512x512 maskable for Android
icon_maskable = create_rounded_icon_from_download(512, is_maskable=True)
icon_maskable.save("icons/icon-maskable.png", "PNG")

# Generate favicon 64x64
icon64 = create_rounded_icon_from_download(64, is_maskable=False)
icon64.save("icons/favicon.png", "PNG")

print("Successfully generated all rounded icons using img/download.png!")
