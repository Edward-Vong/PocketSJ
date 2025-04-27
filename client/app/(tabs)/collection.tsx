import React from 'react';

const stickers = [
  require('client/assets/images/ducky.png'),
  require('client/assets/images/Piggy.png'),
  require('client/assets/images/power.png'),
  require('client/assets/images/Sammy.png'),
  require('client/assets/images/Sandwichy.png'),
  require('client/assets/images/sparco.png'),
  require('client/assets/images/Trashy.png'),
  require('client/assets/images/ducky.png'),
  require('client/assets/images/Piggy.png'),
  require('client/assets/images/power.png'),
  require('client/assets/images/Sammy.png'),
  require('client/assets/images/Sandwichy.png'),
  require('client/assets/images/ducky.png'),
  require('client/assets/images/Trashy.png'),
  require('client/assets/images/Sammy.png'),
];

const styles = {
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    flexGrow: 1,
    overflowY: 'auto' as const,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    marginBottom: 16,
    textAlign: 'left' as const,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto' as const,
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    borderBottom: '2px solid black',
    paddingBottom: 8,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  sticker: {
    width: '100%',
    objectFit: 'contain' as const,
  },
};

function Collection() {
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Collection</h1>
        <img
          src="/icons/search.svg"
          alt="Search"
          style={styles.searchIcon}
        />
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
