import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { PageHeader } from './index';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const getGoback = () => {
  const button = screen.getByText('돌아가기');
  expect(button).toBeInTheDocument();
  expect(button.getAttribute('href')).toBe('/');
  return button;
};

describe('<PageHeader>', () => {
  it('PageHeader 컴포넌트 랜더링', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { container } = render(
      <Router history={history}>
        <PageHeader />
      </Router>,
    );

    const _text = '할 일 목록';
    const head_text = screen.getByText(_text);
    expect(head_text).toBeInTheDocument();
    expect(screen.queryByText('돌아가기')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('/add URL move', () => {
    const history = createMemoryHistory();
    history.push('/add');
    render(
      <Router history={history}>
        <PageHeader />
      </Router>,
    );

    const _addText = '할 일 추가';
    const head_text = screen.getByText(_addText);
    expect(head_text).toBeInTheDocument();
    getGoback();
  });

  it('/detail/:id URL Move', () => {
    const history = createMemoryHistory();
    history.push('/detail/1');
    render(
      <Router history={history}>
        <PageHeader />
      </Router>,
    );

    const _text = '할 일 상세';
    const head_text = screen.getByText(_text);
    expect(head_text).toBeInTheDocument();
    getGoback();
  });
  it('Not Found URL Move', () => {
    const history = createMemoryHistory();
    history.push('/error');
    render(
      <Router history={history}>
        <PageHeader />
      </Router>,
    );

    const _text = '에러';
    const head_text = screen.getByText(_text);
    expect(head_text).toBeInTheDocument();
    const button = getGoback();
    fireEvent.click(button);

    expect(screen.getByText('할 일 목록')).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
