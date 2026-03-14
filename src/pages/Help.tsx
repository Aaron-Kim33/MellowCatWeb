import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2" /> 돌아가기
        </Button>

        <h1 className="font-display text-4xl font-bold text-primary mb-8">도움말</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">MellowCat이란?</h2>
            <p className="text-muted-foreground leading-relaxed">
              MellowCat은 사용자를 위한 서비스입니다. 자세한 내용은 곧 업데이트될 예정입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">자주 묻는 질문</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-1">어떻게 시작하나요?</h3>
                <p className="text-sm text-muted-foreground">홈 페이지에서 다운로드 버튼을 눌러 시작할 수 있습니다.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-1">후원은 어떻게 하나요?</h3>
                <p className="text-sm text-muted-foreground">메인 페이지의 후원 섹션에서 Buy Me a Coffee를 통해 후원할 수 있습니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">문의하기</h2>
            <p className="text-muted-foreground leading-relaxed">
              추가 질문이 있으시면 언제든지 연락해주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;
