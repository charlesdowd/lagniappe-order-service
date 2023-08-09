import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 1em;

  td:first-child,
  th:first-child {
    border-radius: 10px 0 0 10px;
  }

  td:last-child,
  th:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

export const ResponsiveTable = styled(Table)`
  // Hide 3rd/4th columns on smaller screen sizes
  @media (max-width: 768px) {
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }
    th:nth-child(4),
    td:nth-child(4) {
      display: none;
    }
  }
`;

export const TableHeader = styled.th`
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.32);
  padding: 6px;

  @media (min-width: 768px) {
    padding: 0 16px;
    font-size: 14px;
  }

  @media (min-width: 992px) {
    padding: 0 24px;
    font-size: 16px;
  }
`;

export const TableRow = styled.tr`
  background-color: white;
  height: 86px;
`;

export const TableData = styled.td`
  color: #070f29;
  font-size: 12px;
  font-weight: 600;
  padding: 6px;

  @media (min-width: 576px) {
    padding: 16px;
    font-size: 14px;
  }

  @media (min-width: 992px) {
    padding: 24px;
    font-size: 16px;
  }
`;
