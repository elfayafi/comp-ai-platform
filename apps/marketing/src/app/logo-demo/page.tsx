'use client';

import { Logo, LogoIcon, LogoText } from '@/components/ui/logo';

export default function LogoDemoPage() {
  return (
    <div className="container py-16">
      <h1 className="mb-12 text-4xl font-bold">Logo Variants</h1>

      {/* Full Logos with Text */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Full Logo Variants</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Primary */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Primary Blue</h3>
            <Logo variant="primary" className="h-16 w-auto" />
            <p className="mt-4 text-xs text-muted-foreground">
              Couleur principale - #2563EB
            </p>
          </div>

          {/* Dark */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Dark Blue</h3>
            <Logo variant="dark" className="h-16 w-auto" />
            <p className="mt-4 text-xs text-muted-foreground">
              Version foncée - #1E40AF
            </p>
          </div>

          {/* Light */}
          <div className="rounded-lg border bg-gray-900 p-8">
            <h3 className="mb-4 text-sm font-medium text-gray-400">Light Blue</h3>
            <Logo variant="light" className="h-16 w-auto" />
            <p className="mt-4 text-xs text-gray-400">
              Version claire - #60A5FA
            </p>
          </div>

          {/* Gradient */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Gradient</h3>
            <Logo variant="gradient" className="h-16 w-auto" />
            <p className="mt-4 text-xs text-muted-foreground">
              Dégradé bleu professionnel
            </p>
          </div>

          {/* Monochrome Light */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Monochrome</h3>
            <Logo variant="monochrome" className="h-16 w-auto text-black" />
            <p className="mt-4 text-xs text-muted-foreground">
              Version monochrome - Noir
            </p>
          </div>

          {/* Monochrome Dark */}
          <div className="rounded-lg border bg-gray-900 p-8">
            <h3 className="mb-4 text-sm font-medium text-gray-400">Monochrome White</h3>
            <Logo variant="monochrome" className="h-16 w-auto text-white" />
            <p className="mt-4 text-xs text-gray-400">
              Version monochrome - Blanc
            </p>
          </div>
        </div>
      </section>

      {/* Icon Only */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Icon Only Variants</h2>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border bg-white p-6">
            <LogoIcon variant="primary" className="h-16 w-16" />
            <p className="mt-3 text-xs text-muted-foreground">Primary</p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <LogoIcon variant="dark" className="h-16 w-16" />
            <p className="mt-3 text-xs text-muted-foreground">Dark</p>
          </div>

          <div className="rounded-lg border bg-gray-900 p-6">
            <LogoIcon variant="light" className="h-16 w-16" />
            <p className="mt-3 text-xs text-gray-400">Light</p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <LogoIcon variant="gradient" className="h-16 w-16" />
            <p className="mt-3 text-xs text-muted-foreground">Gradient</p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <LogoIcon variant="monochrome" className="h-16 w-16 text-black" />
            <p className="mt-3 text-xs text-muted-foreground">Black</p>
          </div>

          <div className="rounded-lg border bg-gray-900 p-6">
            <LogoIcon variant="monochrome" className="h-16 w-16 text-white" />
            <p className="mt-3 text-xs text-gray-400">White</p>
          </div>
        </div>
      </section>

      {/* Text Only */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Text Only Variants</h2>
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-8">
            <LogoText variant="primary" className="text-4xl" />
          </div>

          <div className="rounded-lg border bg-white p-8">
            <LogoText variant="dark" className="text-4xl" />
          </div>

          <div className="rounded-lg border bg-gray-900 p-8">
            <LogoText variant="light" className="text-4xl" />
          </div>

          <div className="rounded-lg border bg-white p-8">
            <LogoText variant="gradient" className="text-4xl" />
          </div>
        </div>
      </section>

      {/* Size Variations */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Size Variations</h2>
        <div className="space-y-8 rounded-lg border bg-white p-8">
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Small - h-8</p>
            <Logo variant="primary" className="h-8 w-auto" />
          </div>

          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Medium - h-12</p>
            <Logo variant="primary" className="h-12 w-auto" />
          </div>

          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Large - h-16</p>
            <Logo variant="primary" className="h-16 w-auto" />
          </div>

          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Extra Large - h-24</p>
            <Logo variant="primary" className="h-24 w-auto" />
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">Usage Examples</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Header Example */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Header</h3>
            <div className="flex items-center justify-between rounded border bg-background p-4">
              <Logo variant="primary" className="h-10 w-auto" />
              <div className="flex gap-4">
                <button className="text-sm">Features</button>
                <button className="text-sm">Pricing</button>
              </div>
            </div>
          </div>

          {/* Footer Example */}
          <div className="rounded-lg border bg-gray-900 p-8">
            <h3 className="mb-4 text-sm font-medium text-gray-400">Footer (Dark)</h3>
            <div className="rounded border border-gray-700 bg-gray-800 p-4">
              <Logo variant="light" className="h-10 w-auto" />
            </div>
          </div>

          {/* Card Example */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Card with Icon</h3>
            <div className="flex items-start gap-4 rounded border p-4">
              <LogoIcon variant="gradient" className="h-12 w-12" />
              <div>
                <h4 className="font-semibold">Compiel Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Automated compliance management
                </p>
              </div>
            </div>
          </div>

          {/* Button Example */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Button with Icon</h3>
            <button className="flex items-center gap-3 rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90">
              <LogoIcon variant="monochrome" className="h-6 w-6 text-white" />
              <span className="font-medium">Powered by Compiel</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
