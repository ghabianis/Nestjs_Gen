<template>
  <div class="post-card">
    <div class="w-100 post-card__header">
      <img :src="post.image" class="w-100 h-100 post-card__header-img" />
    </div>
    <div class="px-6 py-4 pb-4 post-card__body">
      <div class="mb-4 fs-9 w-100 post-card__description" v-html="post.description"></div>
      <div class="gap-3 post-card__feedback-container">
        <FeedbackCard title="Vues" icon="View" background="#00D998" :value="post.views" />
        <FeedbackCard
          title="J'aime"
          svg="/svg/icons/like.svg"
          background="#FF6262"
          :value="post.likes"
        />
        <FeedbackCard
          title="Commentaire"
          icon="ChatDotSquare"
          background="#F586E6"
          :value="post.comments"
        />
        <FeedbackCard title="Partages" icon="Share" background="#0AB6FF" :value="post.shares" />
      </div>
    </div>
    <div class="mt-4 mb-4 ms-6 me-6 d-flex justify-content-between post-card__footer">
      <div class="d-flex align-items-center">
        <inline-svg class="post-card__footer-date-icon" src="/svg/icons/time.svg"></inline-svg>
        <span class="ms-2 fs-9 post-card__footer-date">{{ createdAt }}</span>
      </div>
      <div class="horizantal-list__more-icon">
        <CardDropdown
          @edit="handleEdit"
          @share="handleShare"
          @delete="deletePostVisible = true"
          @duplicate="handleDuplicate"
        />
      </div>
    </div>
    <DiscardDraftVue 
       :title="$t('post.card.deleteDialog.title')"
       :message="$t('post.card.deleteDialog.message')"
       :discardText="$t('post.card.deleteDialog.discard')" 
       :cancelText="$t('post.card.deleteDialog.goBack')"
       v-if="deletePostVisible"
       @discard="handleDelete"
       @close="deletePostVisible=false" />


  </div>
</template>
<script lang="ts">
import { getCreatedDate } from '@/core/helpers/date'
import { defineComponent, computed, PropType, ref } from 'vue'
import FeedbackCard from './FeedbackCard.vue'
import CardDropdown from '../shared/CardDropdown/CardDropdown.vue'
import { IPostView, usePostStore } from '@/store/usePostModule'
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { storeToRefs } from 'pinia'
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global

export default defineComponent({
  components: { FeedbackCard, CardDropdown,DiscardDraftVue },
  props: {
    post: {
      required: true,
      type: Object as PropType<IPostView>
    }
  },
  setup(props, { emit }) {
    const deletePostVisible = ref(false)
    const { deletePost, fetchPosts } = usePostStore()
    const { pagination } = storeToRefs(usePostStore())
    const createdAt = computed(() => {
      return getCreatedDate(props.post.createdAt)

    })

    const handleEdit = () => {
      emit('edit', props.post.postid)
    }
    const handleDelete = async () => {
      await deletePost(props.post.postid)
      await fetchPosts({
        skip: pagination.value.skip,
        take: pagination.value.take,
      });
      Components.ElMessage.success(t("post.popup.delete"))

    }
    const handleDuplicate = () => {
      console.log("duplicated")
    }
    const handleShare = () => {
      console.log("shared")
    }

    return { handleEdit, handleDelete, handleShare, handleDuplicate, createdAt, deletePostVisible }
  },
})
</script>
<style lang="scss" scoped>
.post-card {
  background: $bg-dark-600;
  border: 1px solid $bg-dark-600;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #6a7199;
}
.post-card__header {
  background-size: cover;
  height: 240px;
}
.post-card__header-img {
  object-fit: cover;
  border-start-end-radius: 10px;
  border-start-start-radius: 10px;
}
.post-card__body {
  border-bottom: 1px solid $white-transparent-11;
}
.post-card__description {
  color: $text-color-50;
  height: 33px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 15px;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.post-card__feedback-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
  gap: 5px;
}
.post-card__footer {
  font-style: normal;
  font-weight: 400;
  color: $text-color-10;
}
.post-card__footer-date-icon {
  background-color: $bg-dark-500;
  border-radius: 50%;
}
.post-card__footer-more-icon:hover {
  cursor: pointer;
}
.post-card__footer-date {
  color: $text-color-50;
}
.horizantal-list__more-icon:hover {
  cursor: pointer;
}
</style>