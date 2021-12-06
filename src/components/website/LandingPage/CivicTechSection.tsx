import { FC } from 'react';
import Brand from '../Brand';

const CivicTechSection: FC = () => (
  <div className="mt-32 py-32 bg-primaryLight">
    <div className="w-narrowContainer mx-auto">
      <h2 className="text-center text-3xl font-bold">Technologia obywatelska</h2>
      <p className="mt-10 text-center text-lg">
        <Brand /> tworzymy jako projekt <strong>civic tech</strong>. Ruch civic tech (technologii
        obywatelskich) to forma aktywizmu społecznego, która skupia się na stosowaniu technologii do
        wzmocnienia i poprawy współpracy między obywatelami a administracją publiczną. Inicjatywy
        civic tech mają swoje źródło w konkretnych problemach społecznych dotyczących zwykłych
        ludzi, a najważniejszym celem jest nie sprzedaż rozwiązania, ale próba rozwiązania kwestii,
        które są problemem.
      </p>
    </div>
  </div>
);

export default CivicTechSection;
