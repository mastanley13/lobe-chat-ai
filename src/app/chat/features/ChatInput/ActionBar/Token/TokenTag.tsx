import { TokenTag, Tooltip } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ModelTokens } from '@/const/modelTokens';
import { useTokenCount } from '@/hooks/useTokenCount';
import { useSessionStore } from '@/store/session';
import { agentSelectors, chatSelectors } from '@/store/session/selectors';
import { LanguageModel } from '@/types/llm';

const Token = memo(() => {
  const { t } = useTranslation('chat');

  const [input, messageString, systemRole, model] = useSessionStore((s) => [
    s.inputMessage,
    chatSelectors.chatsMessageString(s),
    agentSelectors.currentAgentSystemRole(s),
    agentSelectors.currentAgentModel(s) as LanguageModel,
  ]);
  const inputTokenCount = useTokenCount(input);

  const systemRoleToken = useTokenCount(systemRole);
  const chatsToken = useTokenCount(messageString);

  const totalToken = systemRoleToken + chatsToken;
  return (
    <Tooltip placement={'bottom'} title={t('tokenDetail', { chatsToken, systemRoleToken })}>
      <TokenTag
        maxValue={ModelTokens[model]}
        style={{ marginLeft: 8 }}
        text={{
          overload: t('tokenTag.overload'),
          remained: t('tokenTag.remained'),
          used: t('tokenTag.used'),
        }}
        value={totalToken + inputTokenCount}
      />
    </Tooltip>
  );
});

export default Token;
