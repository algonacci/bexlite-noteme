export const TemplateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bexlite-Noteme</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
