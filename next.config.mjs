import createNextIntlPlugin from 'next-intl/plugin';
import { withPlausibleProxy } from 'next-plausible';

const withNextIntl = createNextIntlPlugin();

// CSP lives in middleware: headers declared here are baked into the build, and
// its connect-src depends on EVENTS_URL, which is only known at runtime.
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(self), microphone=(), geolocation=(), payment=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  webpack: (config, { isServer, webpack }) => {
    const wasmRegex = /argon2.*\.wasm$/;

    config.module.rules.push({
      test: wasmRegex,
      loader: 'base64-loader',
      type: 'javascript/auto',
    });

    config.module.noParse = wasmRegex;

    config.module.rules.forEach(rule => {
      (rule.oneOf || []).forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
          oneOf.exclude.push(wasmRegex);
        }
      });
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// })
    );

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

export default withPlausibleProxy()(withNextIntl(nextConfig));
