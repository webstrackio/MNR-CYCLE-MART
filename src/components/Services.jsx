import SectionTitle from './SectionTitle';
import ServiceCard from './ServiceCard';
import services from '../data/services';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="bg-bg py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title={t('More Than Just Cycles')}
          subtitle={t('Complete cycling support to keep every ride smooth.')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
