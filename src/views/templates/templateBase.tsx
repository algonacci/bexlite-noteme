export const TemplateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bexlite - Noteme</title>
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-50 py-8 text-sm">
        <main class="max-w-[300px] m-auto">{children}</main>
      </body>
    </html>
  );
};
