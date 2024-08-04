import { games } from '../data';

import CollectionSection from './CollectionSection';


export default function CollectionGames({ first, second , third }) {
  console.log(first);
  return (
    <div className="collections">
      <div className="holder">
        <CollectionSection category={first}/>
        <CollectionSection category={second}/>
        <CollectionSection category={third}/>
      </div>
    </div>
  );
}