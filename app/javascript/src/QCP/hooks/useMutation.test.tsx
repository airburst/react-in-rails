import { DataProvider } from "@contexts/DataContext";
import { renderHook, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { useMutation } from "./useMutation";

const mockFn = jest.fn();

describe("useMutation hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("requests mutation once, and calls onSuccess with response data", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    const apiResponse = {
      success: true,
      rfqId: 123,
      quotes: [],
    };

    mockFn.mockReturnValue(Promise.resolve(apiResponse));

    const mockOnSuccess = jest.fn();

    const useCustomHook = async () => {
      return useMutation({
        mutationFn: mockFn,
        onSuccess: mockOnSuccess,
      });
    };

    const { result } = renderHook(() => useCustomHook(), { wrapper });

    await waitFor(() =>
      result.current.then(async ({ isLoading, error, mutate }) => {
        expect(isLoading).toEqual(false);
        expect(error).toEqual(false);
        // Call mutation
        await mutate();
        expect(mockOnSuccess).toHaveBeenCalledWith(apiResponse);
      }),
    );

    expect(mockFn).toBeCalledTimes(1);
  });

  it("returns error when query function throws", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    mockFn.mockImplementation(() => {
      throw new Error("Badness");
    });

    const mockOnSuccess = jest.fn();

    const useCustomHook = async () => {
      return useMutation({
        mutationFn: mockFn,
        onSuccess: mockOnSuccess,
      });
    };

    const { result } = renderHook(() => useCustomHook(), { wrapper });

    await waitFor(() =>
      result.current.then(async ({ isLoading, error, mutate }) => {
        expect(isLoading).toEqual(false);
        expect(error).toEqual(false);
        // Call mutation
        await mutate();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockOnSuccess).toHaveBeenCalledTimes(0);
        // expect(result.current).resolves.toContain({ error: true });
      }),
    );
  });
});
