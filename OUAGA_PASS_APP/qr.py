"""QR generator local; never sends ticket secrets to third parties."""
import sys
import qrcode
import qrcode.image.svg
code=sys.stdin.read(256).strip()
if not code.startswith('OP-') or len(code)>100:
    sys.exit(1)
img=qrcode.make(code, image_factory=qrcode.image.svg.SvgPathImage, box_size=8, border=3)
img.save(sys.stdout.buffer)
