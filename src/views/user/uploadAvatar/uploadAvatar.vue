<template>
    <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/user/uploadAvatar"
            method="post"
            :data="{userId:this.userId}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
            <plus/>
        </el-icon>
    </el-upload>
</template>

<script>


  export default {
    name: "uploadAvatar",
    data() {
      return {
        imageUrl: '',
        userId: 0,
        user: {
          avatar: ""
        }
      }
    },
    created() {
      this.userId = this.$store.state.userId
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);

        this.user.avatar = this.imageUrl
        this.$store.dispatch('AUploadAvatar', this.user)
        this.$message.success('上传头像成功');
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt10M;
      }
    }
  }
</script>

<style scoped>

    .avatar-uploader, .el-upload {
        width: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon, .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }

    .avatar {
        width: 100%;
    }
</style>