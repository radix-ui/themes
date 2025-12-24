import { Hero } from '@kushagradhawan/kookie-blocks';
import '@kushagradhawan/kookie-blocks/styles.css';

export default function TestBlocksPage() {
  return (
    <div>
      <h1>Testing kookie-blocks from npm</h1>
      <Hero>
        <h2>Hero from kookie-blocks!</h2>
        <p>If you can see this styled correctly, publishing works!</p>
      </Hero>
    </div>
  );
}

