export const colorToHex = (color: string) => {
  let hex = color.substring(1);
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return parseInt(hex, 16);
};

export const colorToRGB = (color: string) => {
  let hex = colorToHex(color);

  const r = hex >> 16;
  const g = (hex >> 8) & 0xff;
  const b = hex & 0xff;
  return [r, g, b];
};

export const invertColor = (color: string) => {
  const res = (0xffffff - colorToHex(color)).toString(16);
  if (res.length < 6) {
    return "#" + "0".repeat(6 - res.length) + res;
  }
  return "#" + res;
};

export const factorColor = (color: string, factor?: number) => {
  let [r, g, b] = colorToRGB(color);
  r *= factor ?? 0.5;
  g *= factor ?? 0.5;
  b *= factor ?? 0.5;

  let res = ((r << 16) | (g << 8) | b).toString(16);
  while (res.length < 6) {
    res = "0" + res;
  }
  return "#" + res;
};

export const dullColor = (color: string, factor?: number) => {
  if (colorToHex(color) >= 0x800000) {
    return factorColor(color, factor);
  }
  return invertColor(factorColor(invertColor(color), factor));
};
