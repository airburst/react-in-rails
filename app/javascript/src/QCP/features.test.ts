import { STORAGE_FEATURE_OVERRIDE_KEY } from "./constants";
import { loadFeaturesFromStorage } from "./features";

const STORAGE_KEY = STORAGE_FEATURE_OVERRIDE_KEY;

describe("Features", () => {
  describe("loadFeaturesFromStorage", () => {
    describe.each([
      ["localStorage", localStorage],
      ["sessionStorage", sessionStorage],
    ])("Using %s", (_label, storage) => {
      afterEach(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      it("reads features from correct key", () => {
        const sampleData = { exampleFeature: true, otherExampleFeature: false };
        storage.setItem(STORAGE_KEY, JSON.stringify(sampleData));

        expect(loadFeaturesFromStorage(storage)()).toStrictEqual(sampleData);
      });

      it("gracefully handles missing data", () => {
        expect(loadFeaturesFromStorage(storage)()).toStrictEqual({});
      });

      it("gracefully handles invalid data", () => {
        storage.setItem(STORAGE_KEY, "{");
        expect(loadFeaturesFromStorage(storage)()).toStrictEqual({});
      });
    });
  });
});
