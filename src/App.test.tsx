import React, { useState as useStateMock } from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Title';
import { Story } from './Types';

// 次、前ボタンが両方表示されるデータ
const defaultData_both: Story = {
  title: "test",
  version: "test",
  chatgpt: ["test"],
  claude: ["test"],
  gemini: ["test"],
  copilot: ["test"],
  prompt: ["test"],
  totalcount: 1,
  offset: 1,
  has_prev: true,
  has_next: true
};
// 次ボタンのみ表示されるデータ
const defaultData_only_next: Story = {
  title: "test",
  version: "test",
  chatgpt: ["test"],
  claude: ["test"],
  gemini: ["test"],
  copilot: ["test"],
  prompt: ["test"],
  totalcount: 1,
  offset: 1,
  has_prev: false,
  has_next: true
};

// 次ボタンのみ表示されるデータ
const defaultData_only_prev: Story = {
  title: "test",
  version: "test",
  chatgpt: ["test"],
  claude: ["test"],
  gemini: ["test"],
  copilot: ["test"],
  prompt: ["test"],
  totalcount: 1,
  offset: 1,
  has_prev: true,
  has_next: false
};



// フェッチロジックの空実装
const fetchDataMethod = async (currentoffset: string, direction: string) => { };


const create_test_component = (storyData: Story) => {
  return function TestComponent() {
    const [data, setData] = useStateMock<Story>(storyData);
    return <Title data={data} moveMethod={fetchDataMethod} />;
  };
};




test("前ボタン/次ボタンの存在", async () => {
  const TestComponent = create_test_component(defaultData_both);
  render(<TestComponent />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(2);
});

test("前ボタンのみ存在するか", async () => {
  const TestComponent = create_test_component(defaultData_only_prev);
  render(<TestComponent />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
  const button: HTMLButtonElement = buttonList[0] as HTMLButtonElement;
  expect(button.value).toBe("< 前");
});

test("次ボタンのみ存在するか", async () => {
  const TestComponent = create_test_component(defaultData_only_next);
  render(<TestComponent />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
  const button: HTMLButtonElement = buttonList[0] as HTMLButtonElement;
  expect(button.value).toBe("次 >");
});
