import SleepHouse from "./SleepHouse";
import type { SleepHouseRegion } from "./SleepHouse";

export default function PmaxPage({ region }: { region: SleepHouseRegion }) {
  return <SleepHouse pmax region={region} />;
}
