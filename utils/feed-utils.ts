import { FeedItem } from "../components/layout/MasonryGrid/MasonryGrid";

/**
 * Randomizes the order of the feed
 * @param array the feed array
 * @returns
 */
export function shuffle(array: FeedItem[]) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// WIP: If we plan on replacing the Masonry on HomeGrid
// We can take a look at the codes below

// const closest = (needle: number, lastCol: number) => {
//   const cols = [3, 4, 6];
//   if (lastCol === 8) {
//     return 4;
//   }

//   if (needle >= 12) {
//     const newNeedle = needle / 4;

//     return cols.reduce((a, b) => {
//       return Math.abs(b - newNeedle) < Math.abs(a - newNeedle) ? b : a;
//     });
//   }

//   return cols.reduce((a, b) => {
//     return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
//   });
// };

// const getAvailableCol = ({
//   currentRow,
//   total,
//   lastCol,
// }: {
//   currentRow: number;
//   total: number;
//   lastCol?: number;
// }) => {
//   const available = total >= 12 ? 12 * currentRow - total : total;
//   let output = 4;

//   // First row - case of item next to a video
//   if (lastCol === 8) {
//     output = 4;
//   }

//   if (total - 12 === 0 && lastCol === 4) {
//     output = 3;
//   }

//   if (available > 0) {
//     output = closest(available, lastCol || output);
//   }

//   console.log({
//     currentRow,
//     available,
//     output,
//     closest: closest(available, lastCol || output),
//   });

//   return output;
// };

// export function generateFeedItemCols(array: FeedItem[]) {
//   let res = [];
//   let total = 0;
//   let lastItem = null;
//   let nextItem = null;
//   let currentRow = 0;

//   for (let i = 0; i < array.length; i++) {
//     const item = array[i];
//     nextItem = array[i + 1];

//     // if item is a video, it will always be 8cols
//     if (item.type === "video") {
//       item.cols = 8;
//       total = total + 8;
//     } else {
//       const col = getAvailableCol({
//         currentRow,
//         total,
//         lastCol: lastItem?.cols,
//       });
//       total = total + col;
//       item.cols = col;
//     }

//     res.push(item);
//     // keep track of the last item
//     lastItem = item;
//     currentRow = Math.ceil(total / 12);
//   }

//   // first item will dictate the other 2 in a row
//   // max 3 items per row
//   // other items can be either 3, 4 to 6 cols
//   return res;
// }
