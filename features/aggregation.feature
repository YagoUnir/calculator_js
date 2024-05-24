Feature: aggretation
  Basic aggregation

  Scenario Outline: Add two numbers
    Given a calculator
    When first number is <first_number> and second number is <second_number>
    Then I should be told <answer>

  Examples:
    | first_number  | second_number   | answer  |
    | 1             | 2               | 3       |
    | -1            | 2               | 1       |
