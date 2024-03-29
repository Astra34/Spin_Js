function start(idContainer, idItems) {
  const ITEM_WIDTH = 5;
  const ANIMATION_DURATION = 5000;
  const ITEM_PROBABILITIES = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

  function choiceItem(tabOfProbabilities) {
    const totalProbability = tabOfProbabilities.reduce((a, b) => a + b, 0);
    if (totalProbability === 0 || totalProbability > 1) {
      return null;
    }
    const randomNum = Math.random() * totalProbability;
    let sum = 0;
    let middleBoxIndex = 0;

    for (let i = 0; i < tabOfProbabilities.length; i++) {
      sum += tabOfProbabilities[i];
      if (randomNum <= sum) {
        middleBoxIndex = i;
        break;
      }
    }
    return middleBoxIndex;
  }

  function animate(idContainer, idItems) {
    const container = document.getElementById(idContainer);
    if (!container) {
      console.error('Container element not found.');
      return;
    }
    const containerWidth = container.offsetWidth;

    const items = idItems.map((id) => {
      const item = document.getElementById(id);
      if (!item) {
        console.error(`Item element with ID "${id}" not found.`);
      }
      return item;
    });

    const randomItemIndex = choiceItem(ITEM_PROBABILITIES);
    const randomItem = items[randomItemIndex];
    const randomItemOffsetLeft = randomItem.offsetLeft;

    let shouldBreak = false;
    const velocity = 10;
    const startTime = Date.now();
    const endTime = startTime + ANIMATION_DURATION;

    items.forEach((element) => {
      const elementOffsetLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      let distanceMoved = 0;
      const startingPoint = elementOffsetLeft - containerWidth + distanceMoved - ITEM_WIDTH;

      const itemAnimate = () => {
        if (elementOffsetLeft - distanceMoved <= -ITEM_WIDTH- elementWidth) {
          distanceMoved = startingPoint;
        }
        if (Date.now() >= endTime && randomItemOffsetLeft - distanceMoved + (elementWidth / 2) === containerWidth / 2) {
          shouldBreak = true;
        }
        if (!shouldBreak) {
          element.style.right = `${distanceMoved}px`;
          distanceMoved += velocity;
        }
        if (shouldBreak) {
          setTimeout(() => {
            element.style.right = 0 + 'px';
            button.disabled = false;
          }, 2000);
          return shouldBreak;
        }
        requestAnimationFrame(itemAnimate);
      };

      itemAnimate();
      
    });
  }

  animate(idContainer, idItems);
}


const button = document.getElementById('open');
button.addEventListener('click', function() {
  button.disabled = true;
  start('container', ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10']);
});



