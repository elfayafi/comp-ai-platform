import { db } from '@db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // Allow up to 60 seconds for seeding

const frameworks = [
  {
    id: 'frk_683f377429b8408d1c85f9bd',
    name: 'SOC 2',
    description: 'SOC 2 Type I & II',
    version: '1',
    visible: true,
  },
  {
    id: 'frk_681ecc34e85064efdbb76993',
    name: 'ISO 27001',
    description: 'ISO 27001',
    version: '2022',
    visible: true,
  },
  {
    id: 'frk_681fdd150f59a1560a66c89a',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    version: '2025',
    visible: true,
  },
  {
    id: 'frk_681ef1952907deb7cb85896d',
    name: 'GDPR',
    description: 'GDPR',
    version: '1.0.0',
    visible: true,
  },
  {
    id: 'frk_68c1ead24950f84849db81bb',
    name: 'PCI DSS',
    description: 'PCI DSS',
    version: '1.0.0',
    visible: true,
  },
  {
    id: 'frk_68cc0e2a21184ed168ab2eea',
    name: 'ISO 42001',
    description: 'Global standard for AI management, guiding organizations to use AI safely, ethically, and effectively.',
    version: '1.0.0',
    visible: true,
  },
  {
    id: 'frk_68e135d0212b3b6cd39ceb94',
    name: 'NEN 7510',
    description: 'Dutch information security standard for the healthcare',
    version: '1.0.0',
    visible: true,
  },
  {
    id: 'frk_6820c8b318a6d88bf2c4586d',
    name: 'NIS 2',
    description: 'NIS 2',
    version: '2022/2555',
    visible: false,
  },
  {
    id: 'frk_6820090a1653380dd386c5eb',
    name: 'NIST CSF',
    description: 'National Institute of Standards and Technology Cybersecurity Framework',
    version: '2.0',
    visible: false,
  },
];

export async function POST() {
  try {
    // Optional: Add authentication check here
    // const session = await auth.api.getSession({ headers: await headers() });
    // if (!session?.user?.isPlatformAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const results = [];

    for (const framework of frameworks) {
      const result = await db.frameworkEditorFramework.upsert({
        where: { id: framework.id },
        create: framework,
        update: framework,
      });
      results.push(result);
    }

    const visibleCount = results.filter((f) => f.visible).length;

    return NextResponse.json({
      success: true,
      message: 'Frameworks seeded successfully',
      stats: {
        total: results.length,
        visible: visibleCount,
        hidden: results.length - visibleCount,
      },
      frameworks: results.map((f) => ({ id: f.id, name: f.name, visible: f.visible })),
    });
  } catch (error: any) {
    console.error('Error seeding frameworks:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: 500 },
    );
  }
}
