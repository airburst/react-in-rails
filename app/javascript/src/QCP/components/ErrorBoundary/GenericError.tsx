import { Alert, Flex } from "@simplybusiness/mobius";

export const GenericError = () => (
  <Flex justifyContent="center" alignItems="center">
    <Flex style={{ maxWidth: "960px" }}>
      <Alert header="Ooops" show variant="error">
        Something went wrong. Please try refreshing the page; SimplyBusiness has
        been notified.
      </Alert>
    </Flex>
  </Flex>
);
