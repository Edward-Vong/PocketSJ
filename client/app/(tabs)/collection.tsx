import React from 'react';

import ducky from '../../assets/images/ducky.png';
import piggy from '../../assets/images/Piggy.png';
import power from '../../assets/images/power.png';
import sammy from '../../assets/images/Sammy.png';
import sandwichy from '../../assets/images/Sandwichy.png';
import sparco from '../../assets/images/sparco.png';
import trashy from '../../assets/images/Trashy.png';


const stickers = [
  ducky,
  piggy,
  power,
  sammy,
  sandwichy,
  sparco,
  trashy,
  ducky,
  piggy,
  power,
  sammy,
  sandwichy,
  sparco,
  trashy,
  ducky,
];

const styles = {
  container: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    flexGrow: 1,
    overflowY: 'auto' as 'auto',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'left' as 'left',
  },
  searchIcon: {
    width: '20px',
    height: '20px',
    marginLeft: 'auto' as 'auto',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    borderBottom: '2px solid black',
    paddingBottom: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  sticker: {
    width: '100%',
    objectFit: 'contain' as 'contain',
  },
};

function Collection() {
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Collection</h1>
      </div>

      <div style={styles.grid}>
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt={`Sticker ${index}`}
            style={styles.sticker}
          />
        ))}
      </div>
    </div>
  );
}

export default Collection;
