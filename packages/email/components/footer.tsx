import { Hr, Link, Section, Text } from '@react-email/components';

export function Footer() {
  return (
    <Section className="w-full">
      <Hr />

      <Text className="font-regular text-[14px]">
        AI that handles compliance for you -{' '}
        <Link href="https://trycompiel.com?utm_source=email&utm_medium=footer">Compiel</Link>.
      </Text>

      <Text className="text-xs text-[#B8B8B8]">
        Compiel | 2261 Market Street, San Francisco, CA 94114
      </Text>
    </Section>
  );
}
