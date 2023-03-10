import { Fragment, useCallback } from 'react';

export const useHighlight = (filter: string) =>
  useCallback(
    (text: string) => {
      if (!filter) return text;
      const regex = new RegExp(filter, 'ig');
      const matchValue = text.match(regex);

      if (matchValue) {
        return text.split(regex).map((el, index, array) => {
          if (index < array.length - 1) {
            const lightSubstring = matchValue.shift();

            return (
              <Fragment key={`${el}-${el.length}`}>
                {el}
                <span style={{ color: '#FF5253' }} data-test-id='highlight-matches'>
                  {lightSubstring}
                </span>
              </Fragment>
            );
          }

          return el;
        });
      }

      return text;
    },
    [filter]
  );
