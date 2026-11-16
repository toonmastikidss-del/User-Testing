import os
from PIL import Image, ImageDraw

def generate_perfect_icon(size, is_maskable=False):
    # Open user's download.png
    src = Image.open("img/download.png").convert("RGBA")
    
    # Crop to the actual logo bounds (no extra white padding)
    # Bounding box of the logo was (52, 39, 151, 152)
    logo = src.crop((52, 38, 152, 153))
    
    # Target canvas
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    
    # Calculate scale to fit nicely in the center (taking ~78% of icon size)
    target_dim = int(size * 0.76)
    scale = target_dim / max(logo.width, logo.height)
    new_w = int(logo.width * scale)
    new_h = int(logo.height * scale)
    logo_resized = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Center logo
    paste_x = (size - new_w) // 2
    paste_y = (size - new_h) // 2
    canvas.paste(logo_resized, (paste_x, paste_y), logo_resized)
    
    if not is_maskable:
        # Create smooth rounded squircle mask (22% radius)
        mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(mask)
        radius = int(size * 0.22)
        draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=255)
        
        output = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        output.paste(canvas, (0, 0), mask)
        return output
    else:
        return canvas

# Generate all icons
icon512 = generate_perfect_icon(512, is_maskable=False)
icon512.save("icons/icon-512.png", "PNG")

icon192 = generate_perfect_icon(192, is_maskable=False)
icon192.save("icons/icon-192.png", "PNG")

icon180 = generate_perfect_icon(180, is_maskable=False)
icon180.save("icons/apple-touch-icon.png", "PNG")

icon_mask = generate_perfect_icon(512, is_maskable=True)
icon_mask.save("icons/icon-maskable.png", "PNG")

icon64 = generate_perfect_icon(64, is_maskable=False)
icon64.save("icons/favicon.png", "PNG")

print("Generated all icons with pure download.png logo perfectly centered and rounded!")
