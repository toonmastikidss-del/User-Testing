import os
from PIL import Image, ImageDraw, ImageFont

def create_usertesting_icon(size, is_maskable=False, is_rounded=True):
    # Base image with transparency
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    blue_color = (27, 90, 249, 255) # #1B5AF9
    white_color = (255, 255, 255, 255)
    
    if is_maskable:
        # Maskable icon covers full area with background color
        draw.rectangle([0, 0, size, size], fill=blue_color)
    elif is_rounded:
        # Rounded squircle icon ("thoda rounded mai")
        radius = int(size * 0.22)
        draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=blue_color)
    else:
        draw.rectangle([0, 0, size, size], fill=blue_color)
        
    # Scale factors
    scale = size / 512.0
    safe_margin = 0.85 if is_maskable else 1.0
    
    # We will draw the UserTesting speech bubble logo in the center
    # Bubble dimensions
    bw = int(180 * scale * safe_margin)
    bh = int(110 * scale * safe_margin)
    bx = int((size - (bw + int(210 * scale * safe_margin))) / 2)
    by = int(size / 2 - bh / 2 - 10 * scale)
    
    # Draw white speech bubble
    bubble_radius = int(22 * scale * safe_margin)
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=bubble_radius, fill=white_color)
    
    # Draw bubble tail (triangle pointing down)
    tail_w = int(22 * scale * safe_margin)
    tail_h = int(22 * scale * safe_margin)
    tail_x = bx + int(bw * 0.45)
    tail_y = by + bh
    draw.polygon([
        (tail_x - tail_w // 2, tail_y),
        (tail_x + tail_w // 2, tail_y),
        (tail_x, tail_y + tail_h)
    ], fill=white_color)
    
    # Try to load a nice clean sans-serif font
    font_large = None
    font_small = None
    for font_name in ["arialbd.ttf", "arial.ttf", "calibrib.ttf", "segoeuib.ttf", "Roboto-Bold.ttf"]:
        try:
            font_size_user = int(48 * scale * safe_margin)
            font_size_test = int(58 * scale * safe_margin)
            font_large = ImageFont.truetype(font_name, font_size_test)
            font_small = ImageFont.truetype(font_name, font_size_user)
            break
        except Exception:
            pass
            
    if font_small and font_large:
        # Text "User" inside bubble
        user_bbox = draw.textbbox((0, 0), "User", font=font_small)
        uw = user_bbox[2] - user_bbox[0]
        uh = user_bbox[3] - user_bbox[1]
        ux = bx + (bw - uw) // 2
        uy = by + (bh - uh) // 2 - int(4 * scale)
        draw.text((ux, uy), "User", font=font_small, fill=blue_color)
        
        # Text "Testing" outside bubble
        tw_x = bx + bw + int(16 * scale * safe_margin)
        test_bbox = draw.textbbox((0, 0), "Testing", font=font_large)
        th = test_bbox[3] - test_bbox[1]
        ty = by + (bh - th) // 2 - int(4 * scale)
        draw.text((tw_x, ty), "Testing", font=font_large, fill=white_color)
        
        # Registered mark
        try:
            font_reg = ImageFont.truetype("arial.ttf", int(20 * scale * safe_margin))
            draw.text((tw_x + (test_bbox[2] - test_bbox[0]) + int(3 * scale), ty - int(4 * scale)), "®", font=font_reg, fill=white_color)
        except Exception:
            pass
    else:
        # Fallback if TTF not found: draw clean geometric "UT" monogram
        pass

    return img

os.makedirs("icons", exist_ok=True)

# Generate 512x512
icon512 = create_usertesting_icon(512, is_maskable=False, is_rounded=True)
icon512.save("icons/icon-512.png", "PNG")

# Generate 192x192
icon192 = create_usertesting_icon(192, is_maskable=False, is_rounded=True)
icon192.save("icons/icon-192.png", "PNG")

# Generate 180x180 for iOS Apple Touch Icon
icon180 = create_usertesting_icon(180, is_maskable=False, is_rounded=True)
icon180.save("icons/apple-touch-icon.png", "PNG")

# Generate 512x512 maskable for Android
icon_maskable = create_usertesting_icon(512, is_maskable=True, is_rounded=False)
icon_maskable.save("icons/icon-maskable.png", "PNG")

# Generate favicon 64x64
icon64 = create_usertesting_icon(64, is_maskable=False, is_rounded=True)
icon64.save("icons/favicon.png", "PNG")

print("Generated all PWA icons successfully in /icons folder!")
