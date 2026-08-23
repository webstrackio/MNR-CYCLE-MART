import SectionTitle from './SectionTitle';
import CycleCard from './CycleCard';
import cycles from '../data/cycles';

export default function Cycles() {
  return (
    <section id="cycles" className="bg-primary py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="Explore Our Cycles"
          subtitle="Find the right cycle for every rider and every journey."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cycles.map((cycle, index) => (
            <CycleCard key={cycle.id} cycle={cycle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}