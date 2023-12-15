export function switchHighlightColor(): void {
  const root = document?.documentElement;

  const min = 70;
  const max = 360;
  const color = `hsl(${Math.floor(
    Math.random() * (max - min) + min,
  )}, 80%, 50%)`;

  root?.style?.setProperty('--highlight', color);
}
