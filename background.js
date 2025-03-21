// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background script received message:", request);

  if (request.action === "generatePDF") {
    const tabId = request.tabId;
    console.log("Processing PDF generation for tab:", tabId);

    if (!tabId) {
      console.error("No tab ID provided");
      sendResponse({ status: "error", message: "No tab ID provided" });
      return true;
    }

    // 注入所有必要的函数和库
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["lib/html2pdf.bundle.min.js"],
      })
      .then(() => {
        return chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: () => {
            // 注入 findMainContent 函数
            window.findMainContent = function () {
              // 常见的文章容器选择器
              const selectors = [
                "article",
                '[role="article"]',
                ".article",
                ".post",
                ".entry",
                ".content",
                "main",
                "#main-content",
                ".main-content",
                // 针对特定网站的常见选择器
                ".article-content",
                ".post-content",
                ".entry-content",
                ".content-area",
                "#content",
                ".article-body",
                ".story-content",
              ];

              // 尝试每个选择器
              for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (element) {
                  // 验证内容是否合理
                  const text = element.innerText;
                  if (text.length > 100 && text.length < 100000) {
                    return element;
                  }
                }
              }

              // 如果没找到，尝试启发式方法
              const paragraphs = document.getElementsByTagName("p");
              let maxLength = 0;
              let bestContainer = null;

              for (const p of paragraphs) {
                const parent = p.parentElement;
                const text = parent.innerText;

                if (text.length > maxLength && text.length < 100000) {
                  maxLength = text.length;
                  bestContainer = parent;
                }
              }

              return bestContainer;
            };

            // 注入 extractAndDownload 函数
            window.extractAndDownload = function () {
              console.log("Starting content extraction");

              // 智能提取文章正文
              const article = window.findMainContent();
              if (!article) {
                console.error("Could not find main content");
                return;
              }

              // 创建临时容器
              const container = document.createElement("div");
              container.style.padding = "20px";
              container.style.fontFamily = "Arial, sans-serif";
              container.innerHTML = article.innerHTML;

              // 配置 PDF 选项
              const opt = {
                margin: 1,
                filename: "article.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: {
                  scale: 2,
                  useCORS: true,
                  logging: true,
                },
                jsPDF: {
                  unit: "in",
                  format: "a4",
                  orientation: "portrait",
                },
              };

              // 生成 PDF
              html2pdf()
                .set(opt)
                .from(container)
                .save()
                .then(() => {
                  console.log("PDF generated successfully");
                })
                .catch((error) => {
                  console.error("PDF generation failed:", error);
                });
            };
          },
        });
      })
      .then(() => {
        return chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: () => window.extractAndDownload(),
        });
      })
      .then(() => {
        console.log("Script executed successfully");
        sendResponse({ status: "success" });
      })
      .catch((error) => {
        console.error("Script execution failed:", error);
        sendResponse({ status: "error", message: error.message });
      });

    return true;
  }
  return true;
});
