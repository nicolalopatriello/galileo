/**
 * Created by Nicola Lopatriello <nicola.lopatriello@gfmintegration.it> on 09/07/20
 */
import { tableFilterParser } from "./../table.component";
import { ColumnFilterEvent, columnFilterOptions } from '../components/filters';

export class FilterParser {
  static getHttpParams(filterParserType: tableFilterParser, t: Map<string, ColumnFilterEvent>): string {
    switch (filterParserType) {
      case 'spring':
        const mapKeys = Array.from(t.keys());
        let parsedString = '';
        if (mapKeys.length > 0) {
          mapKeys.forEach(k => {
              if (!!t.get(k).value && t.get(k).value.toString().length > 0) {
                parsedString += `${t.get(k).columnField}${FilterParser.getSpringOperator(
                  t.get(k).filterOption)}${t.get(k).value}${t.get(k).filterOption === 'inRange' ? `|${t.get(k).valueTo}` : ''},`;
              }
            }
          );
          return parsedString;
        }
        return null;
      default:
        return null;
    }
  }



  private static getSpringOperator(condition: columnFilterOptions) {
    switch (condition) {
      case 'contains':
        return SpringSpecificationsFilters.LIKE;
      case 'equals':
        return SpringSpecificationsFilters.EQUAL;
      case 'notEqual':
        return SpringSpecificationsFilters.NOT_EQUAL;
      case 'lessThanOrEqual':
        return SpringSpecificationsFilters.LESS_OR_EQ;
      case 'greaterThanOrEqual':
        return SpringSpecificationsFilters.GREATER_OR_EQ;
      case 'startsWith':
        return SpringSpecificationsFilters.START_WITH;
      case 'inRange':
        return SpringSpecificationsFilters.BETWEEN;
    }
  }
}

export enum SpringSpecificationsFilters {
  NULL = ':()',
  NOT_NULL = ':*',
  EQUAL = '::',
  NOT_EQUAL = '!:',
  GREATER_OR_EQ = '>',
  LESS_OR_EQ = '<',
  LIKE = '~:',
  IN = '_in_',
  IS = '_is_',
  BETWEEN = '_between_',
  START_WITH = '^:',
}

