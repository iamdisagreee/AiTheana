import { BugButton } from "app/providers/ErrorBoundary";
import { useTranslation } from "react-i18next";
import Input from "shared/ui/Input/Input";
import { Navbar } from "widgets/Navbar";
import { Page } from "widgets/Page/Page";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Navbar />
      <div>TEST</div>
    </Page>
  );
};

export default MainPage;
