import SectionTitle from './SectionTitle';
import BrandCard from './BrandCard';
import brands from '../data/brands';

export default function Brands() {
  return (
    <section id="brands" className="bg-secondary py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="Brands You Can Trust"
          subtitle="Quality bikes from brands riders trust."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}