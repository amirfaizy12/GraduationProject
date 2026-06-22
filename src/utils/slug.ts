import prisma from '../lib/prisma';

export const generateSlug = async (name: string): Promise<string> => {
  // Lowercase, strip non-alphanumeric (keep hyphens), replace whitespace with hyphens
  let baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await prisma.portfolio.findUnique({
      where: { slug },
    });

    if (!existing) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
};
