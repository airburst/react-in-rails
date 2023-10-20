import { DataProvider } from "@/contexts";
import { renderHook, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { useQuery } from "./useQuery";

const mockFn = jest.fn();

describe("useQuery hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns data from query function", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    mockFn.mockReturnValue(Promise.resolve({ some: "data" }));

    const useCustomHook = () => {
      return useQuery({
        queryKey: "customHook",
        queryFn: mockFn,
      });
    };

    const { result } = renderHook(() => useCustomHook(), { wrapper });

    await waitFor(() => result.current.data);

    expect(result.current).toEqual({
      isLoading: false,
      error: false,
      data: { some: "data" },
    });
    expect(mockFn).toBeCalledTimes(1);
  });

  it("uses initial data without calling query function", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    // This should not be called or returned
    mockFn.mockReturnValue(Promise.resolve({ some: "data" }));
    // This should
    const initialData = { test: true, initialValue: 1 };

    const useInitialDataHook = () => {
      return useQuery({
        queryKey: "initialDataHook",
        queryFn: mockFn,
        initialData,
      });
    };

    const { result } = renderHook(() => useInitialDataHook(), { wrapper });

    await waitFor(() => result.current.data);

    expect(result.current).toEqual({
      isLoading: false,
      error: false,
      data: initialData,
    });
    expect(mockFn).toBeCalledTimes(0);
  });

  it("returns error when query function throws", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    mockFn.mockImplementation(() => {
      throw new Error();
    });

    const useMockHook = () => {
      return useQuery({
        queryKey: "mockHook",
        queryFn: mockFn,
      });
    };

    const { result } = renderHook(() => useMockHook(), { wrapper });

    await waitFor(() => result.current.error);

    expect(result.current).toEqual({
      isLoading: false,
      error: true,
    });
  });
});
